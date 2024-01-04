FROM python:3.11

ENV PYTHONUNBUFFERED 1

# タイムゾーンを日本時間に設定
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# コンテナ起動時にDjangoサーバーを実行
# CMD ["/app/wait-for-it.sh", "db:5432", "--timeout=30", "--", "uwsgi", "--ini", "/app/uwsgi.ini"]
CMD ["/app/wait-for-it.sh", "db:5432", "--timeout=30", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
