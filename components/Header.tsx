import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-10 h-10 text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-10 h-10 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <header className=" flex w-full md:w-3/4 p-5 py-3 justify-between text-sm text-gray-800 border-b  dark:border-b">
      {/*left section*/}

      <div>
        <img
          src="https://i.postimg.cc/YCvPM9HH/Quotes-Generator-2-removebg-preview.png"
          alt="Picture of the author"
          width={50}
          height={500}
        />
      </div>

      {/*right section*/}
      <div className="flex space-x-4 items-center">{renderThemeChanger()}</div>
    </header>
  );
};

export default Header;
