/**
 * 技术商
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import { C_AUTHOR } from '../../common/constants';

export default function Copyright() {
  return (
    <footer style={style} className="flex-center">
      Copyright &copy; {C_AUTHOR.TIME} &nbsp;&nbsp; <a href={C_AUTHOR.PATH} target="view_window" style={style.a}>{C_AUTHOR.NAME}</a>
    </footer>
  )
}

const style = {
  textAlign: 'center',
  fontSize: '12px',
  paddingTop: 20,
  paddingBottom: 20,
  marginTop: 0,
  marginBottom: 0,
  minHeight: 40,

  a: {
    fontSize: '12px',
    color: '#999'
  }
};
