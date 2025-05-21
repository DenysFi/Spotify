import { useParams } from "react-router-dom"
import SearchResults from "@/features/search/components/search-results"

export function SearchQueryRoute() {
	const { query = "" } = useParams()
	
	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-6">
				{query ? `Результаты поиска для "${query}"` : "Поиск"}
			</h2>
			<SearchResults query={query} />
		</div>
	)
}
