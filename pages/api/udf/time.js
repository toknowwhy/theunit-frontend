export default async function handler(req, res) {
    res.status(200).send(((new Date()).getTime() / 1000).toString());
}