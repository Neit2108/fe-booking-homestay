import { useState } from "react";

function EmailSection({user}) {
  const [showCalendar, setShowCalendar] = useState(false);

  function toggleCalendar() {
    setShowCalendar(!showCalendar);
  }

  return (
    <div className="mt-10">
      <div className="mb-5 text-lg font-medium">My email Address</div>
      <div className="flex gap-5 items-center mb-5">
        <div className="flex justify-center items-center rounded-full bg-gray-300 bg-opacity-10 h-[45px] w-[45px]">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<svg id="438:145" layer-name="vuesax/bold/sms" width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]"> <path d="M16.5639 3.68472H7.20277C4.39444 3.68472 2.52222 5.08889 2.52222 8.36528V14.9181C2.52222 18.1944 4.39444 19.5986 7.20277 19.5986H16.5639C19.3722 19.5986 21.2444 18.1944 21.2444 14.9181V8.36528C21.2444 5.08889 19.3722 3.68472 16.5639 3.68472ZM17.0039 9.38564L14.0738 11.7259C13.456 12.2221 12.6697 12.4654 11.8833 12.4654C11.097 12.4654 10.3013 12.2221 9.69283 11.7259L6.7628 9.38564C6.46324 9.14225 6.41644 8.69292 6.65047 8.39336C6.89386 8.09381 7.33383 8.03764 7.63338 8.28103L10.5634 10.6213C11.2749 11.1923 12.4824 11.1923 13.1939 10.6213L16.1239 8.28103C16.4235 8.03764 16.8728 8.08444 17.1068 8.39336C17.3502 8.69292 17.3034 9.14225 17.0039 9.38564Z" fill="#4182F9"></path> </svg>',
              }}
            />
          </div>
        </div>
        <div>
          <div className="text-base">{user.email}</div>
          <div className="text-base text-black text-opacity-50">
            1 month ago
          </div>
        </div>
      </div>
      <button className="px-6 py-2.5 text-white rounded-lg bg-accent hover:bg-blue-700 transition-all duration-200">
        +Add Email Address
      </button>
    </div>
  );
}

export default EmailSection;
