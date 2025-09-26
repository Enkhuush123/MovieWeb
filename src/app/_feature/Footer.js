import { Email } from "../_Icons/EmailIcon";
import { FilmIcon } from "../_Icons/FilmIcon";
import { PhoneIcon } from "../_Icons/PhoneIcon";

export const Footer = () => {
  return (
    <div>
      <div className="w-full h-[280px] bg-indigo-700 ">
        <div className="flex justify-between pt-[40px] pr-[80px] pl-[80px]  ">
          <div className="flex  flex-col">
            <div className="flex items-center gap-2">
              <FilmIcon />

              <p className="text-white font-bold text-base ">Movie Z</p>
            </div>
            <div>
              <p className="font-normal text-ms text-white">
                © 2024 Movie Z. All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="flex gap-[96px]">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-white">Contact Information</p>
              </div>

              <div className="flex items-center gap-3">
                <Email />

                <div>
                  <p className="text-white">
                    Email:
                    <br />
                    support@movieZ.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon />

                <div>
                  <p className="text-white">
                    Phone:
                    <br />
                    +976 (11) 123-4567
                  </p>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col gap-3">
              <div>
                <p>Follow us</p>
              </div>
              <div className="flex gap-3 ">
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
                <p>Youtube</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
