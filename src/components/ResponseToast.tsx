interface ResponseProps {
  type: string;
  message: string;
}

export default function ResponseToast({ response }: { response: ResponseProps }) {
  return (
    <div className="bg-opacity-15 bottom-5 flex items-center justify-between p-3 right-5 rounded shadow">
      {response && (
        <div
          className={`${response.type == 'success' ? 'bg-malachite-400' : 'bg-red-500'} text-white px-4 py-2 rounded-lg shadow-md`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
}