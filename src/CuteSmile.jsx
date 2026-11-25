import React,{useId} from 'react';
export default function CuteSmile(){
 const id=useId();const mask=`${id}-face`,pattern=`${id}-glyphs`;
 return <div className="cute-smile" role="img" aria-label="A cheerful celestial smiley that gently floats and blinks"><svg viewBox="0 0 300 300" aria-hidden="true">
 <defs><pattern id={pattern} width="10" height="10" patternUnits="userSpaceOnUse" className="smile-glyphs">
 <path d="M2.6 0Q2.9 2.3 5.2 2.6Q2.9 2.9 2.6 5.2Q2.3 2.9 0 2.6Q2.3 2.3 2.6 0Z" fill="currentColor"/>
 <circle cx="7.7" cy="2.6" r="1.55" fill="none" stroke="currentColor" strokeWidth=".7"/>
 <path d="M2.6 5.9L4.6 7.8 2.6 9.7 .6 7.8Z" fill="currentColor"/><circle cx="7.7" cy="7.8" r="1.2" fill="currentColor"/>
 </pattern><mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="300" style={{maskType:'luminance'}}>
 <circle cx="150" cy="150" r="125" fill="white"/>
 <g className="cute-eye" fill="black"><ellipse cx="103" cy="125" rx="13" ry="23"/><circle cx="99" cy="117" r="4" fill="white"/></g>
 <g className="cute-eye" fill="black"><ellipse cx="197" cy="125" rx="13" ry="23"/><circle cx="193" cy="117" r="4" fill="white"/></g>
 <path d="M96 170 Q150 194 204 170 Q193 225 150 225 Q107 225 96 170Z" fill="black"/>
 <path d="M125 217 Q150 190 175 217 Q150 229 125 217Z" fill="white" opacity=".65"/>
 </mask></defs><rect width="300" height="300" fill={`url(#${pattern})`} mask={`url(#${mask})`}/>
 <g fill="none" stroke="var(--accent)" strokeWidth="1.8" opacity=".9" strokeLinecap="round"><path d="M62 163l6 -5m4 10l6 -5m144 0l6 -5m4 10l6 -5"/></g></svg></div>;
}
