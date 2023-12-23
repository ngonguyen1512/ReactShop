import React from 'react';

const TextSlide = ({ texts, quantity }) => {
    return (
        <div class="site-animation wrapper-heading-home wrapper-heading-home-instagram" >
            {quantity === 1 ? (
                <div class="wrapper-animation2">
                    <span class="text-animation-2">
                        {texts}
                    </span>
                    <span class="text-animation-2">
                        {texts}
                    </span>
                </div>
            ) : (
                <div class="wrapper-animation2">
                    <span class="text-animation-2">
                        {texts}  {texts}
                    </span>
                    <span class="text-animation-2">
                        {texts}  {texts}
                    </span>
                </div>
            )}
        </div>
    )
}

export default TextSlide