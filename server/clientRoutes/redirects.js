import app from '../server';
import { hostIsValid } from '../utilities';

app.get('/iai', (req, res, next)=> {
	if (!hostIsValid(req, 'pubpub')) { return next(); }
	return res.redirect('https://v3.pubpub.org/iai');
});
