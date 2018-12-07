import React from 'react';
import { common } from "../../images/images";

const SidebarLogo = () => {
  return (
    <div className="flex-center">
      <img src={common.logo} alt="" style={style}/>
    </div>
  )
};

export default SidebarLogo


const style = {
  margin: 20,
  width: 40,
  height: 40
};
