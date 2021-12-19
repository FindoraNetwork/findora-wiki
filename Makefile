ci_build_rust_base:
	docker build -t binary-rust-base -f container/Dockerfile-binary-rust-base .
ci_build_fn:
	docker build -t fn -f container/Dockerfile-fn-release .
	docker run -d --rm --name fn fn sleep 99999
	docker cp fn:/target/release/fn ./fn
cleanup_image:
	docker rmi binary-rust-base || true
	docker rmi fn || true
	docker rmi findora-wiki || true
	rm -rf fn build