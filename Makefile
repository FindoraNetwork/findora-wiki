ci_build_rust_base:
	docker rmi binary-rust-base
	docker build -t binary-rust-base -f container/Dockerfile-binary-rust-base .

ci_build_fn:
	docker rmi fn
	docker build -t fn -f container/Dockerfile-fn-release .
	docker run -d --rm --name fn fn sleep 99999
	docker cp fn:/platform/target/release/fn ./fn


      

