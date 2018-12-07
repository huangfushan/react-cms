/**
 * 技术商
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import { AUTHOR_C } from '../../common/constants';

export default function Copyright() {
  return (
    <footer style={style} className="flex-center">
      Copyright &copy; {AUTHOR_C.TIME} &nbsp;&nbsp; <a href={AUTHOR_C.PATH} target="view_window" style={style.a}>{AUTHOR_C.NAME}</a>
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
