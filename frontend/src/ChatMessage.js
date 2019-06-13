import React from 'react'
import Timer from './Timer'


export default ({ name, message}) =>
  <p>
    <strong>{name}</strong> <em>{message}</em>
    <Timer />
  </p>
