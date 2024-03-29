import React from 'react';
import styled from 'styled-components';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactComponent as ConfirmWriteSliderSVG } from '@svg/confirm-write__slider.svg';
import { IConfirmWriteImageSlideInputProps } from 'types/Home/Confirm';
import { IImageFile } from 'types/Common';

function ConfirmWriteImageSlideInput({
  setInputImages,
  inputImages,
}: IConfirmWriteImageSlideInputProps) {
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const image = {
          file: file,
          imageUrl: reader.result as string,
        };
        const temp = [...inputImages];
        temp.push(image as IImageFile);
        setInputImages([...temp]);
      };
    }
  };

  return (
    <WriteSlider>
      <CustomSwiper pagination modules={[Pagination]} spaceBetween={10}>
        {[0, 1, 2, 3, 4].map((inputItem) => (
          <SwiperSlideItem key={inputItem}>
            <input
              accept="image/*"
              type="file"
              onChange={(event) => onChangeImage(event)}
              id={String(inputItem)}
            />
            {!inputImages[inputItem] ? (
              <label htmlFor={String(inputItem)}>
                <div>이미지를 등록하세요.</div>
                <ConfirmWriteSliderSVG />
              </label>
            ) : (
              <CoverImage
                src={inputImages[inputItem].imageUrl}
                alt="coverImage"
              />
            )}
          </SwiperSlideItem>
        ))}
      </CustomSwiper>
    </WriteSlider>
  );
}

export default ConfirmWriteImageSlideInput;

const WriteSlider = styled.section`
  z-index: 0;
  margin-top: 4px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius20};
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const CustomSwiper = styled(Swiper)`
  .swiper-pagination {
    top: auto;
    bottom: 8px;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: rgba(77, 77, 88, 0.52);
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const SwiperSlideItem = styled(SwiperSlide)`
  width: 100%;
  height: 375px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius20};

  & input {
    display: none;
  }

  & label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 22px 16px 20px 16px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    & div {
      font-size: 17px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray7};
      margin-bottom: 18px;
    }
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius20};
`;
