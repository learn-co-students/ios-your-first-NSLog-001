import os 
import tornado.ioloop
from tornado.web import Application


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

def make_app():
    return Application([
	# (r"/content/(.*)", web.StaticFileHandler, {"path": "/var/www"}),
    (r"/", MainHandler),
    (r"/js", MainHandler),
    (r"/css", tornado.web.StaticFileHandler,
    dict(path=settings['static_path'])),
], **settings)


# class StaticFileHandler(tornado.web.StaticFileHandler):
# 	def get(self)

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
}

# print static_path



# ----------------- OLD FLASK CODE BELOW ---------------

REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

def max_concurrents(apikey, domain, start, end, save_to=False):

    d_start = datetime.strptime(start, "%Y-%m-%d")
    d_end = datetime.strptime(end, "%Y-%m-%d")

    delta = d_end - d_start

    toReturn = []
    rows = []
    for i in xrange(delta.days + 1):
        curr_date = d_start + timedelta(days=i)
        formatted_date = curr_date.strftime("%Y-%m-%d")
        params = {
            'host': domain,
            'apikey': apikey,
            'date': formatted_date,
        }
        r = requests.get(REPORTS_API_ENDPOINT, params=params)
       
        data = r.json()

        row = [domain, formatted_date, str(data['data']['overview']['data']['max_concurrents']['num'])]

        # data = r.json()
        toReturn.append(','.join(row))
        rows.append(row)
        #print r.json()
    if save_to:
        path = os.path.join(".", "csv/{0}_{1}_{2}.csv".format(domain, start, end))
        #print path
        with open(path, 'wb') as csvFile:
            writer = DictWriter(csvFile, fieldnames=['domain', 'date', 'max_concurrents'])
            writer.writeheader()
            for row in rows:
                writer.writerow({
                        'domain': row[0],
                        'date': row[1],
                        'max_concurrents': row[2],
                    })
            
    return '\n'.join(toReturn)

@app.route('/')
def home():
    apikey = request.args.get('apikey')
    domain = request.args.get('domain')
    start = request.args.get('start')
    end = request.args.get('end')
    print domain, start, end
    data = ''
    if apikey and domain and start and end:
        data = max_concurrents(apikey, domain, start, end, save_to=True)
    #data = max_concurrents(domain, start, end)
    print type(data)
    return render_template('index.html', data=data, domain=domain, start=start, end=end)

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()


# if __name__ == '__main__':
#     app.run(debug=True)
