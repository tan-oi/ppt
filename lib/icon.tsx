export function Icon({ className }: { className?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-fit">
      <div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,193,7,0.45)_0%,rgba(255,173,0,0.25)_35%,transparent_60%)]
 blur-md"
      />

      <svg
        width="44"
        height="45"
        viewBox="0 0 44 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.6958 10.7132L21.9989 10.3584L21.302 10.7132L8.68799 17.1358L6 18.5044L8.68799 19.8731L21.302 26.2957L21.9989 26.6505L22.6958 26.2957L35.3098 19.8731L37.9978 18.5044L35.3098 17.1358L22.6958 10.7132ZM21.9989 23.2036L12.7697 18.5044L21.9989 13.8053L31.2281 18.5044L21.9989 23.2036ZM13.8659 25.6532L12.7697 26.2113L21.9989 30.9105L31.2281 26.2113L30.1319 25.6532L31.5256 22.9159L35.3098 24.8427L37.9978 26.2113L35.3098 27.58L22.6958 34.0026L21.9989 34.3574L21.302 34.0026L8.68799 27.58L6 26.2113L8.68799 24.8427L12.4722 22.9159L13.8659 25.6532Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
