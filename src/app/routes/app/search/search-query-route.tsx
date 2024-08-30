import { useParams } from "react-router-dom"

export function SearchQueryRoute() {
	const { query } = useParams()
	console.log(1)
	return <div>{query}</div>
}
