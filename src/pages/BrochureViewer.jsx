import { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import ImagePage from '../components/ImagePage';
import { Spin } from 'antd';

const BrochureViewer = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const imageListPC = Array.from({ length: 44 }, (_, i) =>
        `/brochure/${String(i + 1).padStart(2, '0')}.png`
    );

    const imageListMobile = Array.from({ length: 43 }, (_, i) =>
        `/m_brochure/${String(i + 1).padStart(2, '0')}.png`
    );

    const finalImageList = isMobile ? imageListMobile : imageListPC;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // ✅ 너비 기준 모바일 분기
        };

        handleResize(); // 최초 실행
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // 이미지 프리로드
        let loaded = 0;
        finalImageList.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => {
                loaded += 1;
                if (loaded === finalImageList.length) {
                    setIsReady(true);
                }
            };
        });
    }, [isMobile]);

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className={`w-screen h-screen flex items-center justify-center bg-gray-100 overflow-hidden`}>
                {!isReady ? (
                    <Spin size='large' />
                ) : isMobile ? (
                    <div className="w-screen h-screen overflow-auto bg-white">
                        {finalImageList.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                className="w-full h-auto"
                                alt={`page-${idx}`}
                                loading="lazy"
                            />
                        ))}
                    </div>
                ) : (
                    <HTMLFlipBook
                        width={800}
                        height={1131}
                        minWidth={315}
                        maxWidth={1000}
                        minHeight={400}
                        maxHeight={1536}
                        size="stretch"
                        showCover={true}
                        mobileScrollSupport={true}
                        flippingTime={1000}
                        drawShadow={true}
                        className="shadow-2xl rounded-md h-screen"
                        clickEventForward={false}
                    >
                        {finalImageList.map((src, idx) => (
                            <div key={idx} className="page h-full">
                                <ImagePage src={src} />
                            </div>
                        ))}
                    </HTMLFlipBook>
                )}
            </div>
        </div >
    );
};

export default BrochureViewer;