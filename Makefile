
PYENV_PREFIX = .pyenv
PYENV_BINDIR = $(PYENV_PREFIX)/bin

ifeq ($(OS),Windows_NT)
  PYENV_BINDIR = $(PYENV_PREFIX)/Scripts
endif

.pyenv:
	virtualenv $(PYENV_PREFIX)
	$(PYENV_BINDIR)/pip install -r requirements.txt
pyenv: .pyenv

node_modules:
	npm install --save .

run: pyenv node_modules
	node_modules\electron-prebuilt\dist\electron .
