import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PropertyFeature from "../../components/PropertyFeature/PropertyFeature";
import RelatedProperty from "../../components/RelatedProperty/RelatedProperty";
import ZoomableImage from "../../components/ZoomableImage/ZoomableImage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loading/Loader";
import CommentSection from "../../components/Comment/CommentSection";
import { API_URL } from "../../../constant/config";

import bedroomIcon from "../../assets/Detail/ic_bedroom.png";
import livingroomIcon from "../../assets/Detail/ic_livingroom.png";
import bathroomIcon from "../../assets/Detail/ic_bathroom.png";
import diningroomIcon from "../../assets/Detail/ic_diningroom.png";
import wifiIcon from "../../assets/Detail/ic_wifi.png";
import acIcon from "../../assets/Detail/ic_ac.png";
import refrigeratorIcon from "../../assets/Detail/ic_refrigerator.png";
import tvIcon from "../../assets/Detail/ic_tv.png";
import useComment from "../../hooks/useComment";
import { UserContext } from "../../context/UserContext";
import { formatPrice } from "../../Utils/PriceUtils";

function PropertyDetails() {
  const param = useParams();
  const id = param.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [property, setProperty] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    comments,
    loading: commentLoading,
    error: commentError,
    addComment,
  } = useComment(id);

  useEffect(() => {
    const checkCanReview = async () => {
      if (!user || !user.token) {
        setCanReview(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/bookings/can-comment/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setCanReview(response.data.canComment === true);
      } catch (error) {
        console.error("Error checking if user can review:", error);
        setCanReview(false);
      }
    };

    checkCanReview();
  }, [id, user]);

  const createRatingDistribution = (averageRating, totalRatings) => {
    if (!totalRatings) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    // Logic đơn giản để phân phối số đánh giá:
    // Ưu tiên cho số sao gần với averageRating
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const avgRounded = Math.round(averageRating);

    // 60% đánh giá ở mức trung bình
    const mainRatingCount = Math.round(totalRatings * 0.6);
    distribution[avgRounded] = mainRatingCount;

    // 20% đánh giá ở mức cao hơn (nếu có thể)
    if (avgRounded < 5) {
      distribution[avgRounded + 1] = Math.round(totalRatings * 0.2);
    } else {
      distribution[4] += Math.round(totalRatings * 0.1);
    }

    // 20% đánh giá ở mức thấp hơn (nếu có thể)
    if (avgRounded > 1) {
      distribution[avgRounded - 1] = Math.round(totalRatings * 0.2);
    } else {
      distribution[2] += Math.round(totalRatings * 0.1);
    }

    // Điều chỉnh để tổng số đánh giá bằng đúng totalRatings
    const currentTotal = Object.values(distribution).reduce(
      (sum, count) => sum + count,
      0
    );
    if (currentTotal !== totalRatings) {
      distribution[avgRounded] += totalRatings - currentTotal;
    }

    return distribution;
  };

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/places/get-same-category/${id}`
        );
        const data = response.data;

        const related = data.map((item) => ({
          id: item.id,
          image:
            item.images && item.images.length > 0
              ? item.images[0].imageUrl
              : "",
          title: item.name,
          rating: item.rating,
          maxGuests: item.maxGuests,
          isPopular: item.rating > 4,
        }));

        return related;
      } catch (error) {
        console.error("Error fetching related properties:", error);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/places/place-details/${id}`
        ); // Sửa lỗi cú pháp URL
        const data = response.data;
        const relatedProperties = await fetchRelatedProperties();
        setProperty({
          id: data.id,
          name: data.name,
          address: data.address,
          rating: data.rating,
          numOfRating: data.numOfRating,
          description: data.description,
          price: data.price,
          maxGuests: data.maxGuests,
          mainImage:
            data.images && data.images.length > 0
              ? data.images[0].imageUrl
              : "",
          additionalImages: data.images
            ? data.images.slice(1).map((img) => img.imageUrl)
            : [],
          relatedProperties: relatedProperties,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!property) return <div>No property found</div>;

  const features = [
    { src: bedroomIcon, title: "1 bedroom", highlight: false },
    { src: livingroomIcon, title: "1 living room", highlight: true },
    { src: bathroomIcon, title: "1 bathroom", highlight: false },
    { src: diningroomIcon, title: "1 dining room", highlight: true },
    { src: wifiIcon, title: "10 mbp/s", highlight: true },
    { src: acIcon, title: "7 unit ready", highlight: true },
    { src: refrigeratorIcon, title: "1 refrigerator", highlight: true },
    { src: tvIcon, title: "2 televisions", highlight: true },
  ];

  const handleClickRelatedProperty = (relatedPropertyId) => {
    navigate(`/place-details/${relatedPropertyId}`);
  };

  const ratingDistribution = createRatingDistribution(
    property.rating,
    property.numOfRating
  );

  const handleAddComment = async (rating, comment, images) => {
    try {
      await addComment(
        {
          rating,
          text: comment,
        },
        images
      );

      // After successful comment submission, refresh the property data to get updated rating
      try {
        const response = await axios.get(
          `${API_URL}/places/place-details/${id}`
        );
        const updatedPropertyData = response.data;
        setProperty((prevProperty) => ({
          ...prevProperty,
          rating: updatedPropertyData.rating,
          numOfRating: updatedPropertyData.numOfRating,
        }));

        console.log(
          "Updated property data with new rating:",
          updatedPropertyData
        );
      } catch (err) {
        console.error("Error refreshing property data after comment:", err);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      // You could show an error notification here
    }
  };

  return (
    <div className="flex overflow-hidden flex-col bg-white pb-16">
      <Navbar />
      <div className="flex personally flex-col items-start self-center mt-12 w-full max-w-[1141px] max-md:mt-10 max-md:max-w-full">
        {/* Title */}
        <div className="flex flex-col text-center w-full">
          <div className="text-4xl font-bold text-primary">{property.name}</div>
          <div className="mt-1 text-lg font-light text-zinc-400">
            {property.address}
          </div>
        </div>

        {/* Main Content - Images and Description */}
        <div className="self-stretch mt-14 max-md:mt-10 max-md:max-w-full">
          {/* Container 1: Images */}
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {/* Main Image - Left Column */}
            <div className="w-full" style={{ height: "calc(100% - 0px)" }}>
              <div className="h-full">
                <ZoomableImage
                  src={property.mainImage}
                  alt={property.name}
                  className="w-full h-full rounded-2xl"
                  imageClassName="object-cover w-full h-full rounded-2xl max-md:max-w-full"
                  aspectRatio={null}
                />
              </div>
            </div>

            {/* Additional Images - Right Column */}
            <div className="flex flex-col gap-2.5 h-full">
              {property.additionalImages.slice(0, 2).map((image, index) => (
                <div key={index} className="h-[calc(50%-0.625rem)]">
                  <ZoomableImage
                    src={image}
                    alt={`${property.name} ${index + 1}`}
                    className="w-full h-full rounded-2xl"
                    imageClassName="object-cover w-full h-full rounded-2xl max-md:max-w-full"
                    aspectRatio={null}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Container 2: About the place and Booking Section */}
          <div className="grid grid-cols-2 gap-5 mt-12 max-md:grid-cols-1 max-md:mt-10">
            {/* About the place */}
            <div className="flex flex-col text-base font-light text-zinc-400">
              <div className="text-xl font-medium text-primary">Mô tả</div>
              <div className="mt-2.5 mr-11 leading-7 max-md:mr-2.5 max-md:max-w-full">
                {property.description}
              </div>
            </div>
            {/* Booking Section */}
            <div className="flex flex-col items-start px-8 py-6 rounded-2xl border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full">
              <div className="text-xl font-medium text-primary">Đặt phòng</div>
              <div className="mt-4 text-4xl font-light">
                <span className="font-medium text-[#1ABC9C]">
                  {formatPrice(property.price)} VNĐ
                </span>{" "}
                <span className="font-extralight text-[#B0B0B0]">/ ngày</span>
              </div>
              <button
                className="self-stretch px-16 py-1.5 mt-6 text-center text-white bg-accent rounded-lg shadow-sm max-md:px-5 max-md:mt-5 hover:bg-blue-700 transition-colors"
                onClick={() =>
                  navigate("/booking-request", {
                    state: {
                      property: {
                        id: property.id,
                        name: property.name,
                        address: property.address,
                        price: property.price,
                        mainImage: property.mainImage,
                        maxGuests: property.maxGuests,
                      },
                    },
                  })
                }
              >
                Đặt phòng ngay
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-wrap gap-5 justify-between mt-20 w-full text-base font-light leading-relaxed max-w-[1098px] text-zinc-400 max-md:mt-10 max-md:max-w-full">
          {features.map((feature, index) => (
            <PropertyFeature
              key={index}
              icon={feature.src}
              title={feature.title}
              highlight={feature.highlight}
            />
          ))}
        </div>

        {/* Comments Section */}
        <div className="flex flex-col items-start mt-24 w-full max-md:mt-10">
          <div className="text-xl font-medium text-primary">Đánh giá</div>
          <div className="mt-5 w-full max-w-[1098px] max-md:max-w-full">
            {commentLoading ? (
              <Loader />
            ) : (
              <CommentSection
                averageRating={property.rating}
                ratingCounts={ratingDistribution}
                comments={comments}
                onAddComment={handleAddComment}
                canReview={canReview}
              />
            )}
            {commentError && (
              <div className="text-red-500 mt-2">
                Lỗi khi tải đánh giá: {commentError}
              </div>
            )}
          </div>
        </div>

        {/* Related Properties Section */}
        <div className="mt-24 text-xl font-medium text-primary max-md:mt-10">
          Địa điểm tương tự
        </div>
        <div className="self-stretch mt-5 max-md:mr-0.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {property.relatedProperties.map((relatedProperty, index) => (
              <div
                key={index}
                className={`${
                  index > 0 ? "ml-5" : ""
                } w-3/12 max-md:ml-0 max-md:w-full`}
              >
                <RelatedProperty
                  id={relatedProperty.id}
                  image={relatedProperty.image}
                  title={relatedProperty.title}
                  category={relatedProperty.category}
                  isPopular={relatedProperty.isPopular}
                  onImageClick={() =>
                    handleClickRelatedProperty(relatedProperty.id)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 mt-24 max-w-full h-px bg-neutral-200 w-[1439px] max-md:mt-10" />
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[1141px] px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
