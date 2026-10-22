import crypto from 'crypto';

/**
 * Generate Zego Token04 (Official ZEGOCLOUD Server Algorithm)
 * Uses AES-256-GCM encryption with 32-byte secret key and Big-Endian binary buffer packing.
 *
 * @param {number|string} appId - Zego App ID
 * @param {string} userId - User ID
 * @param {string} serverSecret - 32-character Server Secret
 * @param {number} effectiveTimeInSeconds - Validity period in seconds (default 86400)
 * @param {string} payload - Optional custom payload JSON string
 * @returns {string} Token04 string
 */
export const generateToken04 = (appId, userId, serverSecret, effectiveTimeInSeconds = 86400, payload = '') => {
    // Handle flexible argument order: (appId, serverSecret, userId) or (appId, userId, serverSecret)
    if (typeof serverSecret !== 'string' || serverSecret.length !== 32) {
        if (typeof userId === 'string' && userId.length === 32) {
            const temp = userId;
            userId = serverSecret;
            serverSecret = temp;
        }
    }

    const appID = Number(appId);
    if (!appID || isNaN(appID)) {
        throw new Error('appId must be a valid number');
    }

    if (!serverSecret || typeof serverSecret !== 'string' || serverSecret.length !== 32) {
        throw new Error('serverSecret must be a 32-character string');
    }

    if (!userId) {
        throw new Error('userId is required to generate Zego token');
    }

    const createTime = Math.floor(Date.now() / 1000);
    const expireTime = createTime + Number(effectiveTimeInSeconds || 86400);
    const nonce = Math.floor(Math.random() * 2147483648);

    const tokenInfo = {
        app_id: appID,
        user_id: String(userId),
        nonce: nonce,
        ctime: createTime,
        expire: expireTime,
        payload: payload || '',
    };

    const plainText = JSON.stringify(tokenInfo);

    // AES-256-GCM encryption with 32-byte key and 12-byte random IV
    const key = Buffer.from(serverSecret, 'utf8');
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    const encryptBuf = Buffer.concat([encrypted, authTag]);

    // Packed binary layout required by ZEGOCLOUD:
    // 8 bytes: expire timestamp (BigInt64BE)
    // 2 bytes: iv length (UInt16BE)
    // iv bytes (12 bytes)
    // 2 bytes: encryptBuf length (UInt16BE)
    // encryptBuf bytes
    // 1 byte: flag 1
    const b1 = Buffer.alloc(8);
    const b2 = Buffer.alloc(2);
    const b3 = Buffer.alloc(2);
    const b4 = Buffer.alloc(1);

    b1.writeBigInt64BE(BigInt(expireTime), 0);
    b2.writeUInt16BE(iv.length, 0);
    b3.writeUInt16BE(encryptBuf.length, 0);
    b4.writeUInt8(1, 0);

    const packed = Buffer.concat([b1, b2, iv, b3, encryptBuf, b4]);

    return '04' + packed.toString('base64');
};
