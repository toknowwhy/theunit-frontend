'use client';

import Spline from '@splinetool/react-spline';

export default function SplineAnim({url} : {url: string}) {
    return <Spline scene={url} />
}