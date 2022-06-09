ci_build_wiki:
	docker build -t findora-wiki -f container/Dockerfile-wiki .
	docker rm -f findora-wiki || true
	docker run -d --rm --name findora-wiki findora-wiki sleep 99999
	docker cp findora-wiki:/wiki/build ./build
	docker stop -t 0 findora-wiki && docker rm -f findora-wiki
	docker rm $(docker ps -a | awk '{print $1}') || true
	docker rmi -f $(docker images -f "dangling=true" -q) || true

# ci_build_rust_base:
# 	docker build -t binary-rust-base -f container/Dockerfile-binary-rust-base .
# ci_build_fn:
# 	docker build -t fn -f container/Dockerfile-fn-release .
# 	docker run -d --rm --name fn fn sleep 99999
# 	docker cp fn:/home/rust/platform/target/x86_64-unknown-linux-musl/release/fn ./static/bin/linux/fn
# 	docker stop -t 0 fn && docker rm -f fn


build_musl_fn:
	docker build -t musl_fn -f container/Dockerfile-fn-musl-linux .
	docker run -d --rm --name fn musl_fn
	docker cp fn:/volume/target/x86_64-unknown-linux-musl/release/fn ./static/bin/linux/fn
	docker stop -t 0 fn && docker rm -f fn

build_musl_fn_macos:
	docker build -t musl_fn_macos_base container/Dockerfile-fn-musl-macos-base .
	docker build -t muql_fn_macos container/Dockerfile-fn-musl-macos .
cleanup_image:
	docker rmi musl_fn  || true
	docker rmi findora-wiki || true
	rm -rf fn build