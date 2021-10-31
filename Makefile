SHELL := /bin/bash
TS = @echo `date +[\ %F\ -\ %T\ ]`

.PHONY: all watch

all: tags
	@true

tags:
	@etags -R
	$(TS) "'tags' file updated."
