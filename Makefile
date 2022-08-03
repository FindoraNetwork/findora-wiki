ci_build_wiki:
	docker build -t findora-wiki -f container/Dockerfile-wiki .
	docker rm -f findora-wiki || true
	docker run -d --rm --name findora-wiki findora-wiki sleep 99999
	docker cp findora-wiki:/wiki/build ./build
	docker stop -t 0 findora-wiki && docker rm -f findora-wiki
	docker rm $(docker ps -a | awk '{print $1}') || true
	docker rmi -f $(docker images -f "dangling=true" -q) || true


cleanup_image:
	docker rmi findora-wiki || true
