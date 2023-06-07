import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { KC4KCarousel } from "../../components";

const slides = [
    {
      src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_3361.jpg',
      altText: 'Kayla and friends sorting donations in the office.',
      caption: '',
      key: 1,
    },
    {
      src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_6279.jpg',
      altText: 'Kayla Cares 4 Kids accepting a donation from Oceana Coffee.',
      caption: '',
      key: 2,
    },
    {
      src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/20190607_120554.jpg',
      altText: 'Displaying some of the donated items.',
      caption: '',
      key: 3,
    },
    {
      src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_3685.jpg',
      altText: 'Kayla Cares 4 Kids hosting a craft event.',
      caption: '',
      key: 4,
    },
    {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/20180601_224431.jpg',
        altText: 'Kayla and Dr. Furuta on the radio.',
        caption: '',
        key: 5,
      },
      {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_3162.jpg',
        altText: 'Kayla Cares 4 Kids accepting a donation from The Weiss School.',
        caption: '',
        key: 6,
      },
      {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_6126.jpg',
        altText: 'Kayla Displaying some of the toys donated.',
        caption: '',
        key: 7,
      },
      {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_3706-e1606860147201.jpg',
        altText: 'The whole crew at a craft event.',
        caption: '',
        key: 8,
      },
      {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_2921.jpg',
        altText: 'Kayla sharing messages of encouragement.',
        caption: '',
        key: 9,
      },
      {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/20190921_134419.jpg',
        altText: 'Kayla giving a presentation and recruiting volunteers.',
        caption: '',
        key: 10,
      },
      {
        src: 'https://kaylacares4kids.org/wp-content/uploads/2020/10/IMG_4609.jpg',
        altText: 'Kayla displaying some of the donated books.',
        caption: '',
        key: 11,
      },
  ];

const PhotoGallery = () => {
    return (
        <section>
            <div className="sect-head font-xl color-orange">
                <span className='font-playful marg-r-sm'>Photo Gallery</span>
                <FontAwesomeIcon icon={faCamera} className="font-xxl" />
            </div>
            <div className="photo-carousel-container">
              <div className="photo-carousel-position"></div>
              <div className="photo-carousel-content">
                  <KC4KCarousel items={slides} interval={3000} pause={'hover'} />
              </div>
            </div>
        </section>
    )
}

export default PhotoGallery;

