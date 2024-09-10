import { useParams } from "react-router-dom"

export function SearchQueryRoute() {
	const { query } = useParams()
	return <div>{query}</div>
}
