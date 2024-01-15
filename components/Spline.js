'use client'
import Spline from '@splinetool/react-spline';

export default function App({children}) {
  return (
    <div className='relative'>
      <Spline scene="https://prod.spline.design/ylUBxG9he5oJhT1d/scene.splinecode" />
      <div className='absolute'>{children}</div>
    </div>
  );
}