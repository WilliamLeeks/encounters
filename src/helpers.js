export function makeSlug(str) {
	return str.replace(/ /g, '-').toLowerCase();
}

export function slugToTitle(str)
{
	return str.replace(/-/g, ' ');
}