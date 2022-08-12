const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function niceBytes(x: any) {
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export function trim(string: string, length: number) {
    return string.length > length ? string.substring(0, length) + "..." : string;
}

export const reorder = (list: Array<BfObject>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const userLocale =
    navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;

export interface BfObject {
    id: string;
    type: string;
    attributes?: Record<string, any>;
    relationships?: any;
    mimetype: string;
    extension: string;
    filename: string;
    size: number;
    width: number;
    height: number;
    url: string;
    thumbnail_url: string;
    position: number;
    created_at: string | Date;
    updated_at: string | Date;
    cdn_url: string;
}

export interface UiConfig {
    apiKey: string
    dataMode: 'single' | 'multiple'
}

export const itemData: BfObject[] = [
    {
        "id": "abc",
        "type": "attachments",
        "mimetype": "image/png",
        "extension": "png",
        "filename": "Sonata-Logotype-Single.png",
        "size": 241990,
        "width": 6316,
        "height": 6316,
        "url": "https://picsum.photos/200",
        "thumbnail_url": "https://picsum.photos/200",
        "position": 0,
        "created_at": "2022-07-29T19:09:59.471Z",
        "updated_at": "2022-07-29T19:10:13.746Z",
        "cdn_url": "https://picsum.photos/200"
    },
    {
        "id": "ngxmjb2tmwb37rcpfkrsj9v3",
        "type": "attachments",
        "attributes": {
            "mimetype": "image/gif",
            "extension": "gif",
            "filename": "sonata beach gif.gif",
            "size": 26676842,
            "width": 1920,
            "height": 480,
            "url": "https://storage-us-gcs.bfldr.com/ngxmjb2tmwb37rcpfkrsj9v3/v/1053882598/original/sonata%20beach%20gif.gif?Expires=1660116871&KeyName=gcs-bfldr-prod&Signature=Ck_pHhyovgGeqaEGVLhIJMEE2Mk=",
            "thumbnail_url": "https://thumbs.bfldr.com/at/ngxmjb2tmwb37rcpfkrsj9v3?expiry=1660635271&fit=bounds&height=162&sig=NzUxOTZmMTExNmNmNDMzM2UwMzMyN2M3YmFmMjhhMzk2YjRiYjE3NA%3D%3D&width=262",
            "position": 0,
            "created_at": "2022-07-29T19:10:00.795Z",
            "updated_at": "2022-07-29T19:10:30.357Z",
            "cdn_url": "https://cdn.bfldr.com/6L13N7MS/at/ngxmjb2tmwb37rcpfkrsj9v3/sonata_beach_gif.gif?auto=webp&format=gif"
        },
        "relationships": {
            "asset": {
                "data": {
                    "id": "77p47nksphnfwxnwgqb84bt",
                    "type": "generic_files"
                }
            }
        },
        "mimetype": "image/gif",
        "extension": "gif",
        "filename": "sonata beach gif.gif",
        "size": 26676842,
        "width": 1920,
        "height": 480,
        "url": "https://picsum.photos/200",
        "thumbnail_url": "https://picsum.photos/200",
        "position": 0,
        "created_at": "2022-07-29T19:10:00.795Z",
        "updated_at": "2022-07-29T19:10:30.357Z",
        "cdn_url": "https://picsum.photos/200"
    },
    {
        "id": "bc7v59qv5k8tgq2h7k9pbcmn",
        "type": "attachments",
        "attributes": {
            "mimetype": "video/mp4",
            "extension": "mp4",
            "filename": "Perfect Day Florence - Travel Guide.mp4",
            "size": 55470926,
            "width": 1280,
            "height": 720,
            "url": "https://storage-us-gcs.bfldr.com/bc7v59qv5k8tgq2h7k9pbcmn/v/1053882573/original/Perfect%20Day%20Florence%20-%20Travel%20Guide.mp4?Expires=1660116923&KeyName=gcs-bfldr-prod&Signature=pOMi9TL5Z7PJfsfYI3D9Ls9ikzI=",
            "thumbnail_url": "https://storage-us-gcs.bfldr.com/bc7v59qv5k8tgq2h7k9pbcmn/v/1053882573/element.png?Expires=1660116923&KeyName=gcs-bfldr-prod&Signature=OQ7wXmFMUy55bg6RdAVV2qpFxsI=",
            "position": 0,
            "created_at": "2022-07-29T19:09:59.606Z",
            "updated_at": "2022-07-29T19:10:18.118Z",
            "cdn_url": "https://cdn.bfldr.com/6L13N7MS/at/bc7v59qv5k8tgq2h7k9pbcmn/Perfect_Day_Florence_-_Travel_Guide.mp4"
        },
        "relationships": {
            "asset": {
                "data": {
                    "id": "grkw7ht6t3qb4sv79gcxqcc",
                    "type": "generic_files"
                }
            }
        },
        "mimetype": "video/mp4",
        "extension": "mp4",
        "filename": "Perfect Day Florence - Travel Guide.mp4",
        "size": 55470926,
        "width": 1280,
        "height": 720,
        "url": "https://picsum.photos/200",
        "thumbnail_url": "https://picsum.photos/200",
        "position": 0,
        "created_at": "2022-07-29T19:09:59.606Z",
        "updated_at": "2022-07-29T19:10:18.118Z",
        "cdn_url": "https://picsum.photos/200"
    },
    {
        "id": "hj3565f32m63tng7hxcc2cm5",
        "type": "attachments",
        "attributes": {
            "mimetype": "video/quicktime",
            "extension": "mov",
            "filename": "GettyImages-625882314.mov",
            "size": 1512555974,
            "width": 3840,
            "height": 2160,
            "url": "https://storage-us-gcs.bfldr.com/hj3565f32m63tng7hxcc2cm5/v/1053882572/original/GettyImages-625882314.mov?Expires=1660116952&KeyName=gcs-bfldr-prod&Signature=QObkbXn-T90TPih2V2z_wi9L3u4=",
            "thumbnail_url": "https://storage-us-gcs.bfldr.com/hj3565f32m63tng7hxcc2cm5/v/1053882572/element.png?Expires=1660116952&KeyName=gcs-bfldr-prod&Signature=ZMT4P_TH_sU2JmrS8eLRMPlmJ1c=",
            "position": 0,
            "created_at": "2022-07-29T19:09:59.601Z",
            "updated_at": "2022-07-29T19:12:43.642Z",
            "cdn_url": "https://cdn.bfldr.com/6L13N7MS/at/hj3565f32m63tng7hxcc2cm5/GettyImages-625882314.mov"
        },
        "relationships": {
            "asset": {
                "data": {
                    "id": "crg6nhf47phnf6rn9j899tb",
                    "type": "generic_files"
                }
            }
        },
        "mimetype": "video/quicktime",
        "extension": "mov",
        "filename": "GettyImages-625882314.mov",
        "size": 1512555974,
        "width": 3840,
        "height": 2160,
        "url": "https://picsum.photos/200",
        "thumbnail_url": "https://picsum.photos/200",
        "position": 0,
        "created_at": "2022-07-29T19:09:59.601Z",
        "updated_at": "2022-07-29T19:12:43.642Z",
        "cdn_url": "https://picsum.photos/200"
    }

];