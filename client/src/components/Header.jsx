import hamburger from "../assets/Hamburger.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-x-5 items-center h-full">
        <div className="ml-3">
          <img src={hamburger}></img>
        </div>
        <div className="bg-white text-black rounded h-auto w-full">Logo</div>
      </div>
      <div className="border-white border-2 rounded h-auto justify-end items-center flex m-2 p-1">
        Admin
        <div className="border-l-2 border-white text-white mt-1 mb-1 p-0.5 ml-1 h-min">
          10.27
        </div>
      </div>
    </div>
  );
};

export default Header;                             