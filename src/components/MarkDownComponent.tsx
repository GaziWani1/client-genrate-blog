import ReactMarkdown from 'react-markdown';

const MarkDownComponent = ({ blog }: { blog: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => (
          <h1 className="text-3xl font-bold text-gray-800 mb-4" {...props} />
        ),
        h2: (props) => (
          <h2
            className="text-2xl font-semibold text-gray-800 mb-3"
            {...props}
          />
        ),
        h3: (props) => (
          <h3 className="text-xl font-semibold text-gray-700 mb-2" {...props} />
        ),
        h4: (props) => (
          <h4 className="text-lg font-medium text-gray-700 mb-2" {...props} />
        ),
        p: (props) => (
          <p
            className="text-base text-gray-700 leading-relaxed mb-4"
            {...props}
          />
        ),
        ul: (props) => (
          <ul className="list-disc list-inside text-gray-700 mb-4" {...props} />
        ),
        ol: (props) => (
          <ol
            className="list-decimal list-inside text-gray-700 mb-4"
            {...props}
          />
        ),
        li: (props) => <li className="mb-1 ml-4" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
            {...props}
          />
        ),
        code: (props) => (
          <code
            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800"
            {...props}
          />
        ),
        pre: (props) => (
          <pre
            className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"
            {...props}
          />
        ),
        a: (props) => (
          <a className="text-blue-600 hover:underline" {...props} />
        ),
        img: (props) => (
          <img className="my-4 rounded-lg max-w-full" {...props} />
        ),
        strong: (props) => (
          <strong className="font-semibold text-gray-800" {...props} />
        ),
        em: (props) => <em className="italic text-gray-700" {...props} />,
        hr: () => <hr className="my-6 border-gray-300" />,
      }}
    >
      {blog}
    </ReactMarkdown>
  );
};

export default MarkDownComponent;
