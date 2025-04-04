function Hero() {
  return (
    <div className="mt-[69px] w-full max-w-[1140px] max-md:max-w-full max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[43%] ml-0 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-start font-poppins text-base text-[#B0B0B0] font-light max-md:max-w-full max-md:mt-10 mt-10">
            <div className="text-primary text-[42px] font-bold self-stretch text-left max-md:max-w-full">
              <span>Quên bận rộn,</span>
              <br />
              <span>nghỉ dưỡng vui nhộn</span>
            </div>

            <div className="leading-[27px] mt-5 text-left">
              <span>Chúng tôi cung cấp những gì bạn cần</span>
              <br />
              <span>để tận hưởng cùng với gia đình. </span>
              <br />
              <span>Thời gian để tạo nên những kỷ niệm đáng nhớ.</span>
            </div>

            <button className="bg-accent rounded-[7px] shadow-md mt-9 px-[29px] py-[6px] text-xl text-white font-medium text-center max-md:px-5 hover:bg-blue-700 active:bg-blue-800 active:shadow-sm active:translate-y-0.5 transition-all duration-200 cursor-pointer">
              Xem thêm
            </button>

            <div className="flex mt-[85px] w-[402px] max-w-full items-stretch gap-5 leading-[1.7] justify-between max-md:mt-10">
              <div>
                <img
                  src="src\assets\Home\user_travel.png"
                  alt="Users icon"
                  className="w-8 aspect-square object-contain object-center overflow-hidden"
                />
                <div className="mt-[10px]">
                  <span className="font-medium text-primary">2500</span>
                  <span> khách hàng</span>
                </div>
              </div>

              <div>
                <img
                  src="src\assets\Home\camera_icon.png"
                  alt="Treasure icon"
                  className="w-8 aspect-square object-contain object-center overflow-hidden"
                />
                <div className="mt-[10px]">
                  <span className="font-medium text-primary">200</span>
                  <span> khoảnh khắc</span>
                </div>
              </div>

              <div>
                <img
                  src="src\assets\Home\user_travel.png"
                  alt="Cities icon"
                  className="w-8 aspect-square object-contain object-center overflow-hidden"
                />
                <div className="mt-[10px]">
                  <span className="font-medium text-primary">100</span>
                  <span> địa điểm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch w-[57%] ml-5 max-md:w-full max-md:ml-0">
          <div className="h-full flex items-center">
            <img
              src="src\assets\Home\banner.png"
              alt="Hero image"
              className="aspect-square object-contain object-center w-full rounded-none overflow-hidden max-md:max-w-full max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
