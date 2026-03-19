const skills = [
  { name: 'React.js', desc: 'Component architecture, hooks, state management, performance optimization' },
  { name: 'Node.js', desc: 'Server-side JavaScript, REST APIs, async patterns' },
  { name: 'NestJS', desc: 'Modular backend framework, controllers/services/modules, decorators, guards' },
  { name: 'PostgreSQL', desc: 'Schema design, queries, migrations, indexing' },
  { name: 'DevOps', desc: 'Docker, CI/CD pipelines, deployment, environment configuration' },
];

const styles = {
  root: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: '#1a1a2e',
    minHeight: '100vh',
    background: '#f7f8fc',
    margin: 0,
  },
  header: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
    color: '#fff',
    padding: '80px 24px',
    textAlign: 'center',
  },
  name: {
    fontSize: '3rem',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-0.5px',
  },
  title: {
    fontSize: '1.25rem',
    color: '#a8b8d8',
    marginTop: '12px',
    fontWeight: 400,
  },
  section: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '60px 24px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    borderBottom: '3px solid #0f3460',
    paddingBottom: '8px',
    marginBottom: '32px',
    color: '#0f3460',
  },
  aboutText: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#444',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  skillCard: {
    background: '#fff',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #0f3460',
  },
  skillName: {
    fontWeight: 700,
    fontSize: '1.05rem',
    marginBottom: '8px',
    color: '#1a1a2e',
  },
  skillDesc: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: 1.6,
  },
  footer: {
    background: '#1a1a2e',
    color: '#a8b8d8',
    textAlign: 'center',
    padding: '32px 24px',
    fontSize: '0.9rem',
  },
};

export default function Portfolio() {
  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <h1 style={styles.name}>Tu Nguyen</h1>
        <p style={styles.title}>Senior Full-Stack Developer &amp; DevOps Engineer</p>
      </header>

      <main>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About</h2>
          <p style={styles.aboutText}>
            I'm a senior full-stack developer with deep experience building scalable web applications
            and reliable backend systems. I specialize in modern JavaScript ecosystems — from
            crafting responsive React frontends to architecting robust NestJS APIs backed by
            PostgreSQL. I care about clean code, maintainability, and shipping things that actually work.
            Outside of code, I enjoy automating everything in sight and making developer workflows faster.
          </p>
        </section>

        <section style={{ ...styles.section, paddingTop: 0 }}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillsGrid}>
            {skills.map((skill) => (
              <div key={skill.name} style={styles.skillCard}>
                <div style={styles.skillName}>{skill.name}</div>
                <div style={styles.skillDesc}>{skill.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Tu Nguyen &mdash; Senior Full-Stack Developer</p>
      </footer>
    </div>
  );
}
