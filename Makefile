ci_build_rust_base:
	docker build -t binary-rust-base -f container/Dockerfile-binary-rust-base .
	docker rmi binary-rust-base || true
ci_build_fn:
	docker build -t fn -f container/Dockerfile-fn-release .
	docker run -d --rm --name fn fn sleep 99999
	docker cp fn:/platform/target/release/fn ./fn
	docker rmi fn || true

      

