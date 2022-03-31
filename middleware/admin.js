module.exports = function ( req, res, next){

    //401 Unauthorized Wenn man kein valides jwt sendet, aber der client 
    //darf es nochmal versuchen
    //403 Forbidden Wenn das jwt valide ist aber man trotzdem keinen Zugriff
    //hat => nicht nochmal versuchen
    if(!req.user.isAdmin) return res.status(403).send('Access denied');

    next();
}