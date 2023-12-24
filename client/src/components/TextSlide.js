import React from 'react';

const TextSlide = ({ texts, quantity }) => {
    const textContent = Array.from({ length: quantity }, (_, index) => texts).join(' ');
    return (
        <div class="site-animation wrapper-heading-home wrapper-heading-home-instagram" >
            <div class="wrapper-animation2">
                <span class="text-animation-2">
                    {textContent}
                </span>
                <span class="text-animation-2">
                    {textContent}
                </span>
            </div>
        </div>
    )
}

export default TextSlide