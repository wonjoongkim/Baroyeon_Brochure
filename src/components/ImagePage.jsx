const ImagePage = ({ src }) => {
    return (
        <div className="w-full h-full bg-white flex items-center justify-center">
            <img
                src={src}
                alt="brochure page"
                loading="lazy"
                className="max-w-full max-h-full object-contain"
                draggable={false}
            />
        </div>
    );
};

export default ImagePage;