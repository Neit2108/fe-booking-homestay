function BookingForm({ onOpenMap }) {
  return (
    <div className="relative flex mt-[62px] min-h-[243px] w-full max-w-[1142px] flex-col items-start font-inter text-base font-semibold justify-center max-md:max-w-full max-md:mt-10">
      <div className="rounded-[42px] bg-[#EAF1FF] self-center z-0 flex min-h-[117px] w-full justify-between items-center px-10 max-md:flex-col max-md:gap-5 max-md:p-5 max-md:min-h-auto max-sm:p-[15px]" />

      <div className="shadow-md absolute z-0 w-[232px] max-w-full text-[#1E1E1E] bottom-[91px] left-[31px]">
        <div className="relative flex w-full max-w-[232px] flex-col items-center justify-center max-md:flex max-sm:flex">
          <div className="rounded-[12px] bg-white shadow-[0px_0px_0px_rgba(0,0,0,0.01)] z-0 flex min-h-[60px] w-[211px] max-w-full" />
          <div className="absolute z-0 flex items-center gap-5 justify-start left-[21px] top-[17px]">
            <img
              src="src\assets\Home\calendar_icon.png"
              alt="Calendar icon"
              className="aspect-square object-contain object-center w-6 self-stretch mt-auto mb-auto flex-shrink-0 overflow-hidden"
            />
            <div className="self-stretch mt-auto mb-auto">Check Available</div>
          </div>
        </div>
      </div>

      <div className="shadow-md absolute z-0 flex w-[227px] max-w-full flex-col items-center text-[#1E1E1E] bottom-[91px] right-[302px] justify-center">
        <div className="shadow-[0px_0px_0px_rgba(0,0,0,0.01)] relative w-full max-w-[212px]">
          <div
            className="rounded-[12px] bg-white flex min-h-[60px] w-full z-0 cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 active:scale-98 active:shadow-inner"
            onClick={onOpenMap}
          >
            <div className="flex w-full items-center px-5 gap-[18px]">
              <img
                src="src\assets\Home\add_location_alt.png"
                alt="Location icon"
                className="aspect-square object-contain object-center w-[18px] h-[18px] overflow-hidden"
              />
              <div className="text-[#1E1E1E] font-semibold text-base">
                Select Location
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-md absolute z-0 w-[197px] max-w-full bottom-[91px] left-[318px] whitespace-nowrap max-md:whitespace-normal">
        <div className="rounded-[12px] bg-white shadow-md flex w-full max-w-[232px] flex-col items-center min-h-[60px] justify-center max-md:whitespace-normal">
          <div className="flex w-[163px] max-w-full items-center gap-[22px] justify-center mx-auto max-md:whitespace-normal">
            <div className="self-stretch flex mt-auto mb-auto items-center gap-[18px] text-[#1E1E1E] justify-center max-md:whitespace-normal">
              <img
                src="src\assets\Home\person_icon.png"
                alt="Person icon"
                className="aspect-square object-contain object-center w-[18px] self-stretch mt-auto mb-auto flex-shrink-0 overflow-hidden"
              />
              <div className="self-stretch mt-auto mb-auto">Person</div>
            </div>
            <div className="text-black self-stretch mt-auto mb-auto">2</div>
            <img
              src="src\assets\Home\dropdown_icon.png"
              alt="Dropdown icon"
              className="aspect-square object-contain object-center w-5 self-stretch mt-auto mb-auto flex-shrink-0 overflow-hidden"
            />
            <div className="self-stretch flex min-h-[1px] mt-auto mb-auto gap-4" />
          </div>
        </div>
      </div>

      <button className="rounded-[12px] bg-accent shadow-lg absolute z-0 px-8 py-[15px] gap-2 overflow-hidden text-xl text-[#FFFCFC] whitespace-nowrap right-[79px] bottom-[94px] self-stretch max-md:px-5 max-md:whitespace-normal hover:bg-blue-700 active:bg-blue-800 active:shadow-md active:translate-y-0.5 transition-all duration-200 cursor-pointer">
        Search
      </button>
    </div>
  );
}

export default BookingForm;
