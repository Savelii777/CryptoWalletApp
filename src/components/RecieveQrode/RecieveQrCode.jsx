import React, { useState, useEffect, useRef } from "react";
import styles from "./RecieveQrCode.module.css";
import qrcode from "qrcode";

export const RecieveQrCode = ({ walletAdress }) => {
    const qrcodeRef = useRef(null);
    const [qrcodeImage, setQrcodeImage] = useState(null);
    const previousWalletAdress = useRef(null);

    useEffect(() => {
        if (walletAdress !== previousWalletAdress.current) {
            const generateQRCode = async () => {
                try {
                    const qrcodeData = await qrcode.toDataURL(walletAdress, {
                        errorCorrectionLevel: "H",
                        width: 250,
                        height: 250,
                    });
                    setQrcodeImage(qrcodeData);
                } catch (error) {
                    console.error("Error generating QR code:", error);
                }
            };

            generateQRCode();
            previousWalletAdress.current = walletAdress;
        }
    }, [walletAdress]); // Update QR code only when walletAdress changes

    if (!qrcodeImage) {
        return null;
    }

    return (
        <div className={styles.container}>
            <img ref={qrcodeRef} src={qrcodeImage} />
        </div>
    );
};

export default RecieveQrCode;