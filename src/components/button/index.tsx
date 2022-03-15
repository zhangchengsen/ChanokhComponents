import React, { memo } from 'react'
import classNames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}
interface ButtonProps {   // 描述button对象属性
  className ?: string;
  disabled ?: boolean;
  size ?: ButtonSize;    // enum
  btnType?: ButtonType;   // enum
  children?: React.ReactNode;
  href?:string;
}
type NativeButtonProps = ButtonProps & React.ButtonHTMLAttributes<HTMLElement>    //原生button有些必须属性
type AnchorButtonProps = ButtonProps & React.AnchorHTMLAttributes<HTMLElement>    //原生anchor有些必须属性
export type TButtonProps = NativeButtonProps & AnchorButtonProps;
// 传入类型 传入 原生button属性 或原生anchors属性 或自定义元素属性
const Button :React.FC<TButtonProps> = memo((props) => {
  const {className,disabled,size,btnType,children,href,...restProps} = props
  const classes = classNames('btn',{
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    'disabled':(btnType === ButtonType.Link) && disabled
  })  
  if(btnType === ButtonType.Link && href) {
    return (
      <a href={href} {...restProps} className={classes} >{children}</a>
    )
  }
  else {
    return (
      <button {...restProps} className={classes} disabled={disabled}>{children}</button>
    )
  }
})
Button.defaultProps = {
  disabled:false,
  btnType:ButtonType.Default
}
export default Button