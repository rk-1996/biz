import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import {
    Button
} from "antd";
import "slick-carousel/slick/slick-theme.css";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

const CustomArrows = (props) => {

    let { closeFun } = props

    let closePopUp = (e) => {
        closeFun()
    }


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        lazyLoad: true,
        centerMode: true,
        adaptiveHeight: true,
        fade: true,
        arrows: true,
        autoplaySpeed: 5000,
        className: 'slides'
    };
    return (
        <div>
            <Slider {...settings}>
                <div>
                    < div className='snapshot-camara-style'> </div>
                    <div className='status-class-snapshot'>Punch In</div>
                </div>
                <div>
                    < div className='snapshot-camara-style'> </div>
                    <div className='status-class-snapshot'>Punch Out</div>
                </div>
                <div>
                    < div className='snapshot-camara-style'> </div>
                    <div className='status-class-snapshot'>Punch Out</div>

                </div>
            </Slider>
            <div className="flex-x center gx-mt-4">
                {/* <FormItem className="gx-m-0"> */}
                <div className="flex-x">
                    <Button
                        // loading={loader}
                        type="primary"
                        className="login-form-button button-close-history-model"
                        onClick={closePopUp}
                    >
                        Close
            </Button>
                </div>
                {/* </FormItem> */}
            </div>
        </div>
    );

}

export default CustomArrows