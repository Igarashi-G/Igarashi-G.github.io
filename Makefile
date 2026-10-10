PNPM ?= npx --yes pnpm@10.34.6
NODE ?= node
NODE_OPTIONS ?= --max_old_space_size=8192
HOST ?= 127.0.0.1
PORT ?= 8080

.PHONY: setup dev build lint lint-arch lint-content test verify

setup:
	@$(PNPM) install --frozen-lockfile

dev:
	@$(PNPM) run docs:dev --host "$(HOST)" --port "$(PORT)"

build:
	@NODE_OPTIONS="$(NODE_OPTIONS)" $(PNPM) run docs:build

lint-arch:
	@$(NODE) scripts/lint-architecture.mjs

lint-content:
	@$(NODE) scripts/lint-content.mjs

lint: lint-arch lint-content

# This static site has no unit-test suite; its automated tests are repository lint checks.
test: lint

verify: lint
	@build_root=$$(mktemp -d "$${TMPDIR:-/tmp}/igarashi-verify.XXXXXX"); \
	trap 'rm -rf "$$build_root"' EXIT INT TERM; \
	NODE_OPTIONS="$(NODE_OPTIONS)" $(PNPM) run docs:build -- \
		--dest "$$build_root/dist" \
		--temp "$$build_root/temp" \
		--cache "$$build_root/cache"
