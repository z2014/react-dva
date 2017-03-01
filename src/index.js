import './index.html';
import './index.less';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/global'));
app.model(require('./models/member'));
app.model(require('./models/recruit'));
app.model(require('./models/report'));
app.model(require('./models/meeting'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
