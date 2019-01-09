/**
 * 国际化语言高阶组件
 * @Author: huangfs
 * @Date: 2019-01-08
 * @Project: cms
 */

import React from 'react';
import { en, cn } from './index';

const languages = { cn, en };

const I18nContext = React.createContext();

export const I18nConsumer = (key, custom) => {
  return Component => {
    return class extends React.Component {
      render() {
        return (
          <I18nContext.Consumer>
            {(context) => {
              let props;
              if (context.hasOwnProperty(key)) {
                props = { [key]: context[key] };
              } else {
                props = { i18n: context };
              }
              if (custom) {
                Object.assign(props.i18n, custom[context.currentLanguage]);
              }
              return <Component {...this.props} {...props} />;
            }}
          </I18nContext.Consumer>
        );
      }
    };
  };
};

export class I18nProvider extends React.Component {
  render() {
    const language = languages[this.props.currentLanguage] || cn;
    const value = {
      ...language,
      currentLanguage: this.props.currentLanguage || 'cn'
    };
    return (
      <I18nContext.Provider value={value}>
        {this.props.children}
      </I18nContext.Provider>
    );
  }
}
