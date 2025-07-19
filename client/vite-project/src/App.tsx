import { gql, useQuery } from '@apollo/client';
import './App.css';

const query = gql`
  query gettodos {
    gettodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <div className="text-center mt-10 text-blue-600 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 text-xl">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Todo List</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.gettodos.slice(0, 20).map((todo) => (
          <div
            key={todo.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{todo.title}</h2>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">Assigned to:</span>{' '}
              {todo.user?.name || 'Unknown'}
            </p>
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  todo.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
