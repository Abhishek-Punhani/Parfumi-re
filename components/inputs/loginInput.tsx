import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { IoKeyOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

interface LoginInputProps {
  icon: "user" | "email" | "password" | "age";
  placeholder: string;
  name: string;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginInput({
  icon,
  placeholder,
  onChange,
  ...props
}: LoginInputProps) {
  const [field, meta] = useField(props);

  const containerClasses = "relative max-w-[380px] w-full my-2";
  const inputWrapperClasses = `
    relative rounded-full h-[55px] px-4 flex items-center transition-colors
    ${meta.touched && meta.error ? 
         "bg-red-100 dark:bg-red-900" :
         "bg-gray-200 dark:bg-gray-700"}
  `;
  const iconClasses = `
    w-6 h-6 mr-3
    ${meta.touched && meta.error ? 
         "text-red-500 dark:text-red-400" :
         "text-gray-400 dark:text-gray-300"}
  `;
  const inputClasses = `
    bg-transparent outline-none border-none flex-1 font-semibold text-lg transition-colors
    ${meta.touched && meta.error ? 
         "text-red-500 placeholder-red-500" : 
         "text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"}
  `;

  return (
    <div className={containerClasses}>
      <div className={inputWrapperClasses}>
        {icon === "user" ? (
          <BiUser className={iconClasses} />
        ) : icon === "email" ? (
          <SiMinutemailer className={iconClasses} />
        ) : icon === "password" ? (
          <IoKeyOutline className={iconClasses} />
        ) : icon === "age" ? (
          <IoCalendarNumberOutline className={iconClasses} />
        ) : null}
        <input
          type={props.type || "text"}
          placeholder={placeholder}
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e);
          }}
          className={inputClasses}
        />
      </div>
      <ErrorMessage
        component="div"
        className="mt-1 text-sm text-red-600 dark:text-red-500"
        name={props.name}
      />
    </div>
  );
}
