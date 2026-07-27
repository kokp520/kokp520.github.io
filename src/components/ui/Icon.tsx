import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ name, className = 'icon', ...props }) => {
  return (
    <svg className={className} role="presentation" aria-hidden="true" {...props}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}
