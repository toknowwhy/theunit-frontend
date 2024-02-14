// export const supported_resolutions = ['5', '15', '60', '1D', '1W', '1M'];
export const supported_resolutions = ['1D', '1W', '1M'];

export default async function handler(req, res) {
    res.status(200).json({
        supported_resolutions,
        supports_group_request: false,
        supports_marks: false,
        supports_search: true,
        supports_timescale_marks: false,
    });
}