import app from './index';

import { yellow } from './colors'

const port = Number(process.env.PORT || 3456);

try {
    app.listen(port, () => {
		console.log(yellow('weexam API listening on port ' + port));
	});
} catch (err) {
    console.error(err);
    process.exit();
}

