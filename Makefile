deploy:
	pnpm build
	rsync -avz dist/ anaheim:~/sites/dashboard

run:
	pnpm dev
