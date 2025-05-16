import React from "react";
import {
  IoSearchOutline,
  IoWalletOutline,
  IoChatbubbleEllipsesOutline,
  IoHomeOutline,
  IoShieldCheckmarkOutline,
  IoRepeatOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoCreate,
  IoThumbsUpOutline,
  IoGlobeOutline,
} from "react-icons/io5";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleFindHomestay = () => {
    navigate("/homestay-recommend");
  };

  return (
    <section className="relative bg-[#F0F7FF] overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center py-12 px-4">
        {/* Nội dung chữ */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-start justify-center">
          <h1 className="text-3xl md:text-5xl font-roboto font-bold text-blue-700 mb-4">
            Khám phá Homestay hoàn hảo cùng{" "}
            <span className="text-blue-500">HomiesStay</span>
          </h1>
          <p className="text-gray-700 font-roboto text-lg md:text-2xl mb-8 max-w-lg">
            Tìm nơi ở ấm cúng, gần gũi với thiên nhiên cho kỳ nghỉ của bạn.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl shadow transition transform hover:scale-105"
            onClick={handleFindHomestay}
          >
            Tìm Homestay Ngay
          </button>
        </div>
        {/* Ảnh minh họa */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="https://res.cloudinary.com/dbswzktwo/image/upload/v1745398086/places/satrwrb8nh698pc07mld.jpg"
            alt="Không gian homestay"
            className="rounded-3xl shadow-lg max-h-80 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

/* ---------- About/Our Story Section ---------- */
const AboutSection = () => (
  <section className="container mx-auto py-16 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
      Về HomiesStay
    </h2>
    <div className="max-w-3xl mx-auto text-center text-gray-700 text-lg">
      <p className="mb-6">
        <strong>HomiesStay</strong> ra đời với niềm tin: mỗi chuyến đi là một
        hành trình đáng nhớ. Chúng tôi mong muốn mang đến không gian lưu trú
        thật ấm áp, gần gũi, và tràn đầy cảm hứng như chính ngôi nhà của bạn –
        dù bạn đang ở bất cứ đâu.
        <br />
        <br />
        Từ đội ngũ sáng lập đến từng cộng tác viên, tất cả đều chung sứ mệnh{" "}
        <b>kết nối bạn với những trải nghiệm bản địa chân thật</b>, cùng dịch vụ
        tận tâm, minh bạch.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          Sứ mệnh: Kết nối triệu hành trình ý nghĩa
        </span>
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          Giá trị cốt lõi: Chân thành, An tâm, Đổi mới
        </span>
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          Cam kết: Đem lại kỳ nghỉ như ở nhà
        </span>
      </div>
    </div>
  </section>
);

/* ---------- How It Works Section ---------- */
const StepCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition w-full max-w-xs mx-auto">
    <div className="mb-3">{icon}</div>
    <h4 className="font-semibold text-blue-600 mb-1">{title}</h4>
    <p className="text-gray-600 text-center text-sm">{desc}</p>
  </div>
);

const HowItWorksSection = () => (
  <section className="bg-[#F0F7FF] py-16 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-10">
      Đặt homestay chỉ với 3 bước đơn giản
    </h2>
    <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-5xl mx-auto">
      <StepCard
        icon={<IoSearchOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Tìm kiếm"
        desc="Chọn điểm đến, thời gian và xem danh sách homestay phù hợp."
      />
      <StepCard
        icon={<IoCreate className="text-blue-400 w-12 h-12 mb-1" />}
        title="Đặt chỗ"
        desc="Chọn homestay, điền thông tin, xác nhận nhanh chóng."
      />
      <StepCard
        icon={
          <IoCheckmarkCircleOutline className="text-blue-400 w-12 h-12 mb-1" />
        }
        title="Tận hưởng"
        desc="Check-in dễ dàng, bắt đầu kỳ nghỉ đáng nhớ cùng HomiesStay!"
      />
    </div>
  </section>
);

/* ---------- Destination Highlights (5 điểm đến) ---------- */
const DestinationCard = ({ img, name, desc }) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition p-8 flex flex-col items-center max-w-md mx-auto">
    <img
      src={img}
      alt={name}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h4 className="text-blue-600 font-semibold mb-2 text-lg">{name}</h4>
    <p className="text-gray-600 text-base text-center">{desc}</p>
  </div>
);

const DestinationsSection = () => (
  <section className="container mx-auto py-16 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-10">
      Điểm đến nổi bật
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <DestinationCard
        img="https://res.cloudinary.com/dbswzktwo/image/upload/v1745398160/places/tbi3gqybobxbca4lmmcv.jpg"
        name="Hà Nội"
        desc="Thủ đô ngàn năm văn hiến, con người thân thiện, phố xá nhộn nhịp."
      />
      <DestinationCard
        img="https://res.cloudinary.com/dbswzktwo/image/upload/v1745398523/places/lnsn7qn99ojzorgxjafa.jpg"
        name="Đà Lạt"
        desc="Thành phố ngàn hoa, khí hậu mát mẻ quanh năm, nhiều homestay xinh xắn giữa thiên nhiên."
      />
      <DestinationCard
        img="https://res.cloudinary.com/dbswzktwo/image/upload/v1745398146/places/fwhmspmsqmcpsrfujh4h.jpg"
        name="Sa Pa"
        desc="Ẩn mình trong mây núi, nhiều homestay view ruộng bậc thang, gần gũi với đồng bào bản địa."
      />
      <DestinationCard
        img="https://res.cloudinary.com/dbswzktwo/image/upload/v1747390528/img37_bw1rlf.jpg"
        name="Hội An"
        desc="Phố cổ thơ mộng, nhiều homestay gần sông, tiện khám phá ẩm thực và kiến trúc xưa."
      />
      <DestinationCard
        img="https://res.cloudinary.com/dbswzktwo/image/upload/v1747390529/img38_wrbxyn.jpg"
        name="Phú Quốc"
        desc="Đảo ngọc biển xanh cát trắng, homestay đa dạng phong cách, thích hợp nghỉ dưỡng."
      />
      <DestinationCard
        img="https://res.cloudinary.com/dbswzktwo/image/upload/v1747390528/img39_gybwgx.jpg"
        name="Ninh Bình"
        desc="Vùng đất non nước hữu tình, homestay ven hồ yên bình, trải nghiệm văn hóa đồng quê."
      />
    </div>
  </section>
);

/* ---------- Features Section (7 card) ---------- */
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-white rounded-2xl p-8 shadow hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 w-full max-w-md mx-auto">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-600 mb-3">{title}</h3>
    <p className="text-gray-600 text-base text-center">{description}</p>
  </div>
);

const FeaturesSection = () => (
  <section className="container mx-auto py-16 px-4 bg-[#F0F7FF]">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-10">
      Tại sao chọn HomiesStay?
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <FeatureCard
        icon={<IoSearchOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Đặt chỗ dễ dàng"
        description="Chỉ với vài bước đơn giản, bạn đã có thể tìm và đặt homestay phù hợp nhất."
      />
      <FeatureCard
        icon={<IoWalletOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Giá cả minh bạch"
        description="Không phát sinh chi phí ẩn, giá hiển thị luôn rõ ràng và hợp lý."
      />
      <FeatureCard
        icon={
          <IoChatbubbleEllipsesOutline className="text-blue-400 w-12 h-12 mb-1" />
        }
        title="Hỗ trợ 24/7"
        description="Đội ngũ tư vấn luôn sẵn sàng giúp đỡ bạn mọi lúc, mọi nơi."
      />
      <FeatureCard
        icon={<IoHomeOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Đa dạng lựa chọn"
        description="Nhiều homestay đẹp, độc đáo ở mọi địa điểm du lịch nổi tiếng."
      />
      <FeatureCard
        icon={<IoWalletOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Thanh toán linh hoạt"
        description="Nhiều phương thức thanh toán an toàn, phù hợp với mọi khách hàng."
      />
      <FeatureCard
        icon={
          <IoShieldCheckmarkOutline className="text-blue-400 w-12 h-12 mb-1" />
        }
        title="Bảo mật tuyệt đối"
        description="Thông tin khách hàng được bảo vệ, giao dịch luôn an toàn."
      />
      <FeatureCard
        icon={<IoRepeatOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Chính sách linh hoạt"
        description="Dễ dàng hủy/đổi phòng, hoàn tiền nhanh, hỗ trợ tối đa."
      />
      <FeatureCard
        icon={<IoThumbsUpOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Đánh giá thực tế"
        description="Tất cả các homestay đều có đánh giá xác thực từ khách hàng đã trải nghiệm."
      />
      <FeatureCard
        icon={<IoGlobeOutline className="text-blue-400 w-12 h-12 mb-1" />}
        title="Kết nối toàn quốc"
        description="Hệ thống homestay phủ sóng từ thành phố lớn đến vùng quê, đảo xa."
      />
    </div>
  </section>
);

/* ---------- Testimonials Section (7 đánh giá) ---------- */
const TestimonialCard = ({ name, review, stars, avatar }) => (
  <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center hover:shadow-2xl transition w-full max-w-md mx-auto">
    <img
      src={avatar}
      alt={name}
      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100"
    />
    <div className="flex gap-1 mb-2">
      {[...Array(stars)].map((_, i) => (
        <svg
          key={i}
          className="w-6 h-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.364 2.447a1 1 0 00-.364 1.118l1.287 3.945c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.364 2.447c-.785.57-1.84-.197-1.54-1.118l1.287-3.945a1 1 0 00-.364-1.118L2.655 9.372c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 00.95-.69l1.286-3.945z" />
        </svg>
      ))}
    </div>
    <p className="italic text-gray-700 text-center mb-3 text-base">
      "{review}"
    </p>
    <div className="font-medium text-blue-600 text-lg">{name}</div>
  </div>
);

const TestimonialsSection = () => (
  <section className="container mx-auto py-16 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-10">
      Khách hàng nói gì về chúng tôi
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <TestimonialCard
        name="Nguyễn Minh Anh"
        review="Dịch vụ rất tốt, nhân viên thân thiện. Homestay đẹp hơn cả hình, gia đình tôi rất hài lòng!"
        stars={5}
        avatar="https://randomuser.me/api/portraits/women/68.jpg"
      />
      <TestimonialCard
        name="Lê Quang Huy"
        review="Đặt chỗ cực kỳ nhanh chóng, giá rõ ràng và hợp lý. Sẽ quay lại sử dụng HomiesStay!"
        stars={5}
        avatar="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <TestimonialCard
        name="Trần Thu Hà"
        review="Có rất nhiều lựa chọn homestay đẹp và độc lạ. Trải nghiệm tuyệt vời!"
        stars={4}
        avatar="https://randomuser.me/api/portraits/women/10.jpg"
      />
      <TestimonialCard
        name="Phạm Vũ"
        review="Hỗ trợ khách hàng 24/7 siêu nhiệt tình, giúp mình yên tâm suốt chuyến đi!"
        stars={5}
        avatar="https://randomuser.me/api/portraits/men/14.jpg"
      />
      <TestimonialCard
        name="Đặng Thảo"
        review="Thanh toán tiện lợi, hoàn tiền nhanh nếu có thay đổi, rất chuyên nghiệp."
        stars={5}
        avatar="https://randomuser.me/api/portraits/women/21.jpg"
      />
      <TestimonialCard
        name="Phan Bảo Long"
        review="Chính sách hủy/đổi linh hoạt, xử lý rất nhanh. Đáng để tin tưởng."
        stars={5}
        avatar="https://randomuser.me/api/portraits/men/24.jpg"
      />
      <TestimonialCard
        name="Hoàng Mai"
        review="Không gian homestay đẹp, sạch sẽ, giá rẻ hơn so với các nền tảng khác."
        stars={4}
        avatar="https://randomuser.me/api/portraits/women/43.jpg"
      />
      <TestimonialCard
        name="Đỗ Ngọc Nam"
        review="Đặt phòng đi công tác rất tiện, thủ tục check-in nhanh gọn, sẽ giới thiệu cho đồng nghiệp!"
        stars={5}
        avatar="https://randomuser.me/api/portraits/men/36.jpg"
      />
      <TestimonialCard
        name="Trịnh Thanh Vân"
        review="Giao diện website đẹp, dễ dùng, đặt chỗ qua điện thoại cũng rất tiện lợi."
        stars={5}
        avatar="https://randomuser.me/api/portraits/women/52.jpg"
      />
    </div>
  </section>
);

/* ---------- FAQ Section ---------- */
const FAQSection = () => (
  <section className="bg-[#F0F7FF] py-16 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-8">
      Câu hỏi thường gặp
    </h2>
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="font-semibold text-blue-600 mb-2">
          1. Tôi có thể đặt homestay vào phút chót không?
        </div>
        <div className="text-gray-700">
          Hoàn toàn có thể, miễn là homestay còn phòng trống tại thời điểm bạn
          đặt. Bạn nên liên hệ trước để xác nhận chắc chắn nhé!
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="font-semibold text-blue-600 mb-2">
          2. Nếu tôi muốn hủy/đổi lịch thì làm sao?
        </div>
        <div className="text-gray-700">
          Bạn chỉ cần đăng nhập vào tài khoản, chọn đặt phòng cần hủy/đổi và làm
          theo hướng dẫn. Một số homestay có chính sách riêng, hãy đọc kỹ khi
          đặt phòng.
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="font-semibold text-blue-600 mb-2">
          3. Thanh toán có an toàn không?
        </div>
        <div className="text-gray-700">
          Tất cả giao dịch qua HomiesStay đều được bảo mật, nhiều lựa chọn thanh
          toán tiện lợi và an toàn.
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="font-semibold text-blue-600 mb-2">
          4. Tôi có thể liên hệ hỗ trợ bằng cách nào?
        </div>
        <div className="text-gray-700">
          Bạn có thể chat trực tuyến trên website, gọi hotline, hoặc gửi email
          cho đội ngũ HomiesStay 24/7.
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Our Team Section ---------- */
const TeamCard = ({ avatar, name, role, desc }) => (
  <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow hover:shadow-2xl transition w-full max-w-md mx-auto">
    <img
      src={avatar}
      alt={name}
      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100"
    />
    <h4 className="font-semibold text-blue-700 mb-2 text-xl">{name}</h4>
    <p className="text-blue-500 text-base font-semibold mb-2">{role}</p>
    <p className="text-gray-600 text-base text-center">{desc}</p>
  </div>
);

const TeamSection = () => (
  <section className="container mx-auto py-16 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-10">
      Đội ngũ sáng lập
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <TeamCard
        avatar="https://randomuser.me/api/portraits/men/77.jpg"
        name="Lê Dũng Tiến"
        role="Tổng giám đốc"
        desc="Đam mê du lịch trải nghiệm, từng đi qua hơn 4 tỉnh thành Việt Nam, luôn mong muốn nâng tầm dịch vụ lưu trú bản địa."
      />
      <TeamCard
        avatar="https://randomuser.me/api/portraits/women/65.jpg"
        name="Nguyễn Trọng Quang"
        role="Phó tổng giám đốc"
        desc="Từng làm việc trong ngành hospitality, chuyên xây dựng quy trình dịch vụ khách hàng tận tâm và chuyên nghiệp."
      />
      <TeamCard
        avatar="https://randomuser.me/api/portraits/men/45.jpg"
        name="Trần Đức Linh"
        role="Trưởng phòng công nghệ"
        desc="Phụ trách công nghệ, hạ tầng vận hành, đam mê tạo ra nền tảng số an toàn, bảo mật, dễ dùng cho mọi đối tượng."
      />
      <TeamCard
        avatar="https://randomuser.me/api/portraits/women/50.jpg"
        name="Nguyễn Xuân Bắc"
        role="Trưởng phòng phát triển sản phẩm"
        desc="Phụ trách marketing, phát triển thương hiệu HomiesStay phủ sóng toàn quốc, đưa giá trị đến nhiều gia đình."
      />
      <TeamCard
        avatar="https://randomuser.me/api/portraits/men/40.jpg"
        name="Nguyễn Hữu Long"
        role="Trưởng phòng chăm sóc khách hàng"
        desc="Chuyên kết nối đối tác, mở rộng mạng lưới homestay khắp Việt Nam, giúp khách hàng có thêm nhiều lựa chọn thú vị."
      />
    </div>
  </section>
);

/* ---------- Final Call To Action Section ---------- */
const FinalCTASection = () => {
  const navigate = useNavigate();
  const handleFindHomestay = () => {
    navigate("/homestay-recommend");
  };
  return (
    <section className="container mx-auto py-14 px-4 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-4">
        Sẵn sàng cho kỳ nghỉ đáng nhớ cùng HomiesStay?
      </h2>
      <p className="text-gray-700 text-center mb-8 max-w-xl">
        Tìm kiếm, lựa chọn và đặt phòng homestay chỉ trong vài phút. Cùng
        HomiesStay bắt đầu hành trình trải nghiệm mới, ấm cúng và nhiều cảm xúc!
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl shadow transition transform hover:scale-105"
        onClick={handleFindHomestay}
      >
        Tìm Homestay Ngay
      </button>
    </section>
  );
};

/* ---------- Main Introduction Page ---------- */
const IntroductionPage = () => (
  <div className="min-h-screen flex flex-col bg-[#F0F7FF]">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <HowItWorksSection />
    <DestinationsSection />
    <FeaturesSection />
    <TestimonialsSection />
    <TeamSection />
    <FAQSection />
    <FinalCTASection />
    <Footer />
  </div>
);

export default IntroductionPage;
